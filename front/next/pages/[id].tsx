import Link from 'next/link';
import styles from '../styles/Home.module.css'
import Router from 'next/router';
import { GetServerSideProps } from 'next';
import { format } from 'date-fns'

// GET：ID別のタスクを取得
export const getServerSideProps: GetServerSideProps = async (context)=>{
  const id = context.query.id
  const res = await fetch(`http://express:3000/tasks/${id}`)
  const task = await res.json()
  
  return {
    props: { task }
  }
}

// DELETE：ID別のタスクを削除
async function deleteTask(id: number) {
  await fetch(`http://localhost:3001/tasks/${id}`, {
    mode: 'cors',
    method: 'DELETE',
  });
  Router.push('/');
}

// TODO:return値をAPIから取得した情報へ変更
const showCategory = (categoryId: number) => {
  if(categoryId === 1) return '仕事';
  if(categoryId === 2) return 'プライベート';
  if(categoryId === 3) return '趣味';
}

type Pram = {
  task: {
    id: number;
    title: string;
    description: string;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
  }
}

const task = (param: Pram) => {
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>🌱TODO詳細</h1>
      <div className={styles.card}>
      <p className={styles.under}>{showCategory(param.task.categoryId)}</p>
      <p>{param.task.title}</p>
      <h2>{param.task.description}</h2>
      <br></br>
      <a>作成日:{format(new Date(param.task.createdAt), 'yyyy年M月d日 hh時mm分')}</a>
      <br></br>
      <a>更新日:{format(new Date(param.task.updatedAt), 'yyyy年M月d日 hh時mm分')}</a>
      <br></br>
      <Link href={`/${param.task.id}/edit`}><a className={styles.linkButton}>編集</a></Link>
      <button onClick={()=> deleteTask(param.task.id)}><a className={styles.button}>削除</a></button>
      <br/>
    </div>
    <Link href='/'><a>TOP</a></Link>
    </main>
  );
}

export default task;