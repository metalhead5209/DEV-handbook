import {
  Row,
  Col,
  Stack,
  Button,
  Form,
  Card,
  Badge,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { useState, useMemo } from "react";
import { Tag } from "../../App";
import styles from "../../TopicList.module.css";

type SimplifiedTopic = {
  tags: Tag[];
  subject: string;
  id: string;
};

type TopicListProps = {
  availableTags: Tag[];
  topics: SimplifiedTopic[];
  deleteTag: (id: string) => void
  updateTag: (id: string, label: string) => void;
};

type EditTagsModalProps = {
  show: boolean;
  availableTags: Tag[];
  handleClose: () => void;
  deleteTag: (id: string) => void
  updateTag: (id: string, label: string) => void;
};

const TopicList = ({ availableTags, topics, deleteTag, updateTag }: TopicListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [subject, setSubject] = useState("");
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

  const filteredTopics = useMemo(() => {
    return topics.filter((topic) => {
      return (
        (subject === "" ||
          topic.subject.toLowerCase().includes(subject.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            topic.tags.some((topicTag) => topicTag.id === tag.id)
          ))
      );
    });
  }, [subject, selectedTags, topics]);

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Topics</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button
              onClick={() => setEditTagsModalIsOpen(true)}
              variant="outline-secondary"
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="Tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
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
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredTopics.map((topic) => (
          <Col key={topic.id}>
            <TopicCard
              id={topic.id}
              subject={topic.subject}
              tags={topic.tags}
            />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        updateTag={updateTag}
        deleteTag={deleteTag}
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        availableTags={availableTags}
      />
    </>
  );
};
const TopicCard = ({ id, subject, tags }: SimplifiedTopic) => {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5">{subject}</span>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
              {tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
};

const EditTagsModal = ({
  availableTags,
  handleClose,
  show,
  deleteTag,
  updateTag
}: EditTagsModalProps) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Stack gap={2}>
            {availableTags.map(tag => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={e => updateTag(tag.id, e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    onClick={() => deleteTag(tag.id)}
                    variant="outline-danger"
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TopicList;
