import { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import NewTopic from "./components/NewTopic/NewTopic";
import useLocalStorage from "./useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import TopicList from "./components/TopicList/TopicList";
import TopicLayout from "./components/TopicLayout/TopicLayout";
import Topic from "./components/Topic/Topic";
import EditTopic from "./components/EditTopic/EditTopic";

export type Topic = {
  id: string;
} & TopicData;

export type RawTopic = {
  id: string;
} & RawTopicData;

export type RawTopicData = {
  subject: string;
  description: string;
  tagIds: string[];
};

export type TopicData = {
  subject: string;
  description: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

const App = () => {
  const [topics, setTopics] = useLocalStorage<RawTopic[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const topicsWithTags = useMemo(() => {
    return topics.map((topic) => {
      return {
        ...topic,
        tags: tags.filter((tag) => topic.tagIds.includes(tag.id)),
      };
    });
  }, [topics, tags]);

  const onCreateTopic = ({ tags, ...data }: TopicData) => {
    setTopics((prevTopics) => {
      return [
        ...prevTopics,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  };

  const onUpdateTopic = (id: string, { tags, ...data }: TopicData) => {
    setTopics((prevTopics) => {
      return prevTopics.map((topic) => {
        if (topic.id === id) {
          return { ...topic, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return topic;
        }
      });
    });
  };

  const onDeleteTopic = (id: string) => {
    setTopics(prevTopic => {
      return prevTopic.filter(topic => topic.id !== id);
    })
  }

  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  return (
    <Container className="my-5">
      <Routes>
        <Route
          path="/"
          element={<TopicList topics={topicsWithTags} availableTags={tags} />}
        />
        <Route
          path="/new"
          element={
            <NewTopic
              onSubmit={onCreateTopic}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<TopicLayout topics={topicsWithTags} />}>
          <Route index element={<Topic onDeleteTopic={onDeleteTopic}/>} />
          <Route
            path="edit"
            element={
              <EditTopic
                onSubmit={onUpdateTopic}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
};

export default App;
