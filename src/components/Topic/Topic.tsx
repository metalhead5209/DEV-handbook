import { useTopic } from "../TopicLayout/TopicLayout";
import { Row, Col, Stack, Badge, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

type TopicProps = {
  onDeleteTopic: (id: string) => void;
};

const Topic = ({ onDeleteTopic }: TopicProps) => {
  const topic = useTopic();
  const navigate = useNavigate();
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{topic.subject}</h1>
          {topic.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {topic.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${topic.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button onClick={() => {
                onDeleteTopic(topic.id)
                navigate('/')
              }}  
            variant="outline-danger">Delete</Button>
            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{topic.description}</ReactMarkdown>
    </>
  );
};

export default Topic;
