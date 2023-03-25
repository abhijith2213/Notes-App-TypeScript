import { useNote } from "./NoteLayout"
import { Row, Col, Stack, Badge, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

type NoteProps = {
  onDelete: (id: string) => void
}
export const Note = ({ onDelete }: NoteProps) => {
  const note = useNote()
  const navigate = useNavigate()

  return (
    <>
      <Row className="align-items-center my-5">
        <Col>
          <h1 className="text-white">{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={2} direction="horizontal" className="mt-2 flex-wrap">
              {note.tags.map((tag) => (
                <Badge className="text-truncate bg-info fs-6" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button
              variant="outline-danger"
              onClick={() => {
                onDelete(note.id)
                navigate("/")
              }}
            >
              Delete
            </Button>
            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown className="text-white fs-4">{note.markdown}</ReactMarkdown>
    </>
  )
}
