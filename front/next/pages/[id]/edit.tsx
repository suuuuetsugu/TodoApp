import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { GetServerSideProps } from 'next';

const categoriesUrl = `http://express:3000/categories`;

// GET：ID別のタスクとカテゴリ一覧の取得
export const getServerSideProps: GetServerSideProps = async (context)=>{
  const id = context.query.id
  const taskRes = await fetch(`http://express:3000/tasks/${id}`)
  const task = await taskRes.json()

  const categoryRes = await fetch(categoriesUrl)
  const categories = await categoryRes.json()
 
  return{
    props: { task, categories }
  }
}

type Task = {
    id: number;
    title: string;
    description: string;
    done: boolean;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
}

type Categories = {
    id: number;
    name: string;
}

type Category = {
    map(arg0: (category: { id: number; name: string; }) => JSX.Element): JSX.Element;
    categories: Array<Categories>;
}

type Data = {
  task: Task;
  categories: Category;
}
    
// PATCH：ID別のタスクの編集
const Edit= (data: Data) => {
  const [title, setTitle] = useState<string>(`${data.task.title}`);
  const [description, setDescription] = useState<string>(`${data.task.description}`);
  const [categoryId, setCategoryId] = useState<number>(data.task.categoryId);

  // 送信イベント発火後にAPIへデータを送る
  const submitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = {
        "title": title,
        "description": description,
        "categoryId": categoryId,
      };
      await fetch(`http://localhost:3001/tasks/${data.task.id}`, {
        mode: 'cors',
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': '*',
        },
        body: JSON.stringify(body),
      })
      .then(function (response) {
        console.log(response);
      })
      // TOPページへ自動で戻す
      await Router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  // GETした「タスクデータのcategoryId」が「カテゴリ一覧のid」と合致したら対応する「カテゴリのname」を初期値に据える
  // TODO：selectedタグを使わずに実装する
  const options = data.categories.map(
    (category: {
        id: number;
        name: string;
    }) => {
      if(category.id === categoryId) {
        return (
          <option key={category.id} value={category.name} selected>
          {category.name}
          </option>
        )
      } else {
        return (
          <option key={category.id} value={category.name} >
              {category.name}
          </option>
        )
      }
    }
  );
  
  return (
    <>
      <div>
        <form onSubmit={submitData}>
          <h1>Edit Task</h1>
          <select
            autoFocus
            onChange={(e) => setCategoryId(Number(e.currentTarget.value))}
          >
          {options}
          </select>
          <input
            autoFocus
            onChange={(e) => setTitle(e.currentTarget.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setDescription(e.currentTarget.value)}
            placeholder="Description"
            rows={8}
            value={description}
          />
          <input disabled={!description || !title || !categoryId } type="submit" value="Edit" />
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
    </>
  );
};

export default Edit;