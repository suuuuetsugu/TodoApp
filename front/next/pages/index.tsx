import { GetServerSideProps } from 'next';
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Router from 'next/router';
import { format } from 'date-fns'

const getUrl = `http://express:3000/tasks`;

// GET：タスク一覧の取得
export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(getUrl)
  const tasks = await res.json()

  return { props: { tasks }}
};

const Home = (data: { tasks: [] }) => {

    // DELETE：選択したタスクを削除
    async function deleteTask(id: number) {
      await fetch(`http://localhost:3001/tasks/${id}`, {
        mode: 'cors',
        method: 'DELETE',
      });
      Router.push('/');
    }

    // セレクトボックスの設定
    const showCategory = (categoryId: number) => {
      if(categoryId === 1) return '仕事';
      if(categoryId === 2) return 'プライベート';
      if(categoryId === 3) return '趣味';
    }

    // GETした「タスクデータのcategoryId」が「カテゴリ一覧のid」と合致したら対応する「カテゴリのname」を初期値に据える
    // TODO：selectedタグを使わずに実装する
    // const showCategory = (categoryId: number) => {
    //   data.categories.map(
    //     (category: {
    //         id: number;
    //         name: string;
    //     }) => {
    //       if(category.id === categoryId) {
    //         return category.name;
    //       }
    //     }
    //   );
    // }

    // const showCategory = (categoryId: number, data: { categories: []}): any => {
    //   data.categories.map(
    //     (category: {
    //       id: number;
    //       name: string;
    //     }) => {
    //     if(category.id === categoryId) return category.name;
    //     }
    //   )
    // }

    return (
      <main className={styles.main}>
        <h1 className={styles.heading}>TODOリスト</h1>
        <Link href={`/create`}><a className={styles.card}>📝新規作成</a></Link>
        <br/>
        <div className={styles.grid}>
          {data.tasks.map((task:{
            id: number;
            title: string;
            done: boolean;
            categoryId: number;
            createdAt: string;
            updatedAt: string;
          }) => {
            return(
              <div key={task.categoryId} className={styles.card}>
                <p className={styles.under}>{showCategory(task.categoryId)}</p>
                <h2>{task.title}</h2>
                <a suppressHydrationWarning>作成日:{format(new Date(task.createdAt), 'yyyy年M月d日 hh時mm分')}</a>
                <br></br>
                <a suppressHydrationWarning>更新日:{format(new Date(task.updatedAt), 'yyyy年M月d日 hh時mm分')}</a>
                <br></br>
                <Link href={`/${task.id}`}><a className={styles.linkButton}>詳細</a></Link>
                <Link href={`/${task.id}/edit`}><a className={styles.linkButton}>編集</a></Link>
                <button onClick={()=> deleteTask(task.id)}><a className={styles.button}>削除</a></button>
              </div>
            )
          })}
        </div>
      </main>
    )
}

export default Home
