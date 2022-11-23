import { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import NewTopic from "./components/NewTopic/NewTopic";
import { useLocalStorage } from "./useLocalStorage";
import { v4 as uuidV4 } from "uuid";

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

function App() {
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

  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  return (
    <Container className="my-5">
      <Routes>
        <Route path="/" element={<h1>Dev Handbook</h1>} />
        <Route
          path="/new"
          element={<NewTopic onSubmit={onCreateTopic} onAddTag={addTag} availableTags={tags} />}
        />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
