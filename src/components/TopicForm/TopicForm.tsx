import { FormEvent, useRef, useState } from "react";
import { Stack, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatetableReactSelect from "react-select/creatable";
import { TopicData, Tag } from "../../App";
import { v4 as uuidV4 } from "uuid";

type TopicFormProps = {
  onSubmit: (data: TopicData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<TopicData>;

const TopicForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  subject = "",
  description = "",
  tags = [],
}: TopicFormProps) => {
  const subjectRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      subject: subjectRef.current!.value,
      description: descriptionRef.current!.value,
      tags: selectedTags,
    });
    navigate("..");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={3}>
        <Row>
          <Col>
            <Form.Group controlId="Subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control ref={subjectRef} required defaultValue={subject} className="inputs" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="Tags">
              <Form.Label>Tags</Form.Label>
              <CreatetableReactSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
                className="tag-select danger"
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            defaultValue={description}
            required
            as="textarea"
            ref={descriptionRef}
            rows={20}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={3} className="justify-content-end">
          <Button type="submit" variant="outline-primary">
            Save
          </Button>
          <Link to="..">
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
