import { Row, Col, Stack, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import  ReactSelect  from 'react-select';
import { useState } from 'react';
import { Tag } from '../../App';
import { v4 as uuidV4} from 'uuid';

type TopicListProps = {
    availableTags: Tag[]
}

const TopicList = ({ availableTags }: TopicListProps) => {
    const [selectedTags, setSelectedTags ] = useState<Tag[]>([])
    const [topic, setTopic] = useState('');
  return (
    <>
      <Row className='align-items-center mb-4'>
        <Col>
          <h1>Topics</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button variant="outline-secondary">Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" value={topic} 
              onChange={e => setTopic(e.target.value)}
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
                options={availableTags.map(tag => {
                  return { label: tag.label, value: tag.id }
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
    </>
  );
};

export default TopicList;
