import { Stack, Row, Col, Form } from "react-bootstrap";
import CreatetableReactSelect from 'react-select/creatable';
import './FactForm.css'

const FactForm = () => {
  return (
    <Form>
      <Stack gap={3}>
        <Row>
          <Col>
            <Form.Group controlId="Subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="Tags">
              <Form.Label>Tags</Form.Label>
              <CreatetableReactSelect isMulti className="tag-select" />
            </Form.Group>
          </Col>
        </Row>
      </Stack>
    </Form>
  );
};

export default FactForm;
