import { FormEvent, useRef, useState } from "react";
import { Stack, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatetableReactSelect from "react-select/creatable";
import "./TopicForm.css";
import { TopicData, Tag } from '../../App';

type TopicFormProps = {
  onSubmit: (data: TopicData) => void;
}

const TopicForm = ({ onSubmit }: TopicFormProps) => {
  const subjectRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const [ selectedTags, setSelectedTags ] = useState<Tag[]>([])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      subject: subjectRef.current!.value,
      description: descriptionRef.current!.value,
      tags: [],
    })
  }
  return (
    <Form>
      <Stack gap={3}>
        <Row>
          <Col>
            <Form.Group controlId="Subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control ref={subjectRef} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="Tags">
              <Form.Label>Tags</Form.Label>
              <CreatetableReactSelect value={selectedTags.map(tag => {
                return {label: tag.label, value: tag.id}
              })}
              onChange={tags => {
                setSelectedTags(tags.map(tag => {
                  return { label: tag.label, id: tag.value}
                }))
              }} 
              isMulti 
              className="tag-select" />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control required as="textarea" ref={descriptionRef} rows={20} />
        </Form.Group>
        <Stack direction="horizontal" gap={3} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to=".." >
          <Button type="button" variant="outline-danger">
            Cancel
          </Button>
          </Link>
          
        </Stack>
      </Stack>
    </Form>
  );
};

export default TopicForm;
