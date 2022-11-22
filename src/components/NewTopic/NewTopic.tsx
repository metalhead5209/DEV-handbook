import React from 'react';
import { TopicData } from '../../App';
import TopicForm from '../TopicForm/TopicForm';

const NewTopic = () => {
  return (
    <>
    <h1>New Topic</h1>
    <TopicForm onSubmit={function (data: TopicData): void {
        throw new Error('Function not implemented.');
      } } />
    </>
  )
}

export default NewTopic