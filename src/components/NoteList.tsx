import { useMemo, useState } from "react"
import { Row, Col, Stack, Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import ReactSelect from "react-select"
import { Tag } from "../App"
import { EditTagsModal } from "./EditTagsModal"
import NoteCard, { NoteCardProps } from "./NoteCard"

type NoteListProps = {
  availableTags: Tag[]
  notes: NoteCardProps[]
  deleteTag: (id: string) => void
  updateTag: (id: string, label: string) => void
}
const NoteList = ({
  availableTags,
  notes,
  deleteTag,
  updateTag,
}: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState("")
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      )
    })
  }, [title, selectedTags, notes])

  return (
    <>
      <Row className="align-items-center mb-4 ">
        <Col>
          <h1 className="text-info">Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button
              onClick={() => setEditModalIsOpen(true)}
              variant="outline-secondary"
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4" xs={1} md={2}>
          <Col>
            <Form.Group controlId="title">
              <Form.Label className="text-white">Title</Form.Label>
              <Form.Control
                className="bg-dark bg-lighten-xl text-white"
                type="text"
                value={title}
                placeholder="search by title..."
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label className="text-white">Tags</Form.Label>
              <ReactSelect
                styles={{
                  option: (base) => ({
                    ...base,
                    background: "#212529",
                    color: "white",
                    border: "white 1px ",
                  }),
                  control: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: "#212529",
                    color: "white",
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: "hotpink",
                    primary: "black",
                    white: "black",
                  },
                })}
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id }
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id }
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value }
                    })
                  )
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-5">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        show={editModalIsOpen}
        handleClose={() => setEditModalIsOpen(false)}
        availableTags={availableTags}
        deleteTag={deleteTag}
        updateTag={updateTag}
      />
    </>
  )
}

export default NoteList
