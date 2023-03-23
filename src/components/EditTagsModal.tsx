import { Modal, Form, Stack, Row, Col, Button } from "react-bootstrap"
import { Tag } from "../App"

type EditTagsModalProps = {
  show: boolean
  availableTags: Tag[]
  handleClose: () => void
  deleteTag: (id: string) => void
  updateTag: (id: string, label: string) => void
}
export const EditTagsModal = ({
  availableTags,
  handleClose,
  show,
  deleteTag,
  updateTag,
}: EditTagsModalProps) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    onChange={(e) => updateTag(tag.id, e.target.value)}
                    value={tag.label}
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
  )
}
