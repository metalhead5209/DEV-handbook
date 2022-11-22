import { useState, useMemo } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NewFact from "./components/NewFact/NewFact";
import { useLocalStorage } from './useLocalStorage';

export type Fact = {
  id: string
} & FactData

export type RawFact = {
  id: string
} & RawFactData

export type RawFactData = {
  subject: string
  description: string
  tagIds: string[]
}

export type FactData = {
  subject: string
  description: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}


function App() {
const [facts, setFacts] = useLocalStorage<RawFact[]>("NOTES", [])
const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

const factsWithTags = useMemo(() => {
  return facts.map(fact => {
    return {...fact, tags: tags.filter(tag => fact.tagIds.includes(tag.id)) }
  })
}, [facts, tags])
  return (
    <Container className="my-5">
      <Routes>
      <Route path='/' element={<h1>Dev Handbook</h1>} />
      <Route path='/new' element={<NewFact />} />
      <Route path='/:id'>
        <Route index element={<h1>Show</h1>} />
        <Route path="edit" element={<h1>Edit</h1>} />
      </Route>
      <Route path='*' element={<Navigate to="/" />} />
    </Routes>
    </Container>
    
  )
}

export default App
