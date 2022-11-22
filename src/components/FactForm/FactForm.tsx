import { Stack, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatetableReactSelect from "react-select/creatable";
import "./FactForm.css";

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
        <Form.Group controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control required as="textarea" rows={20} />
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

export default FactForm;
