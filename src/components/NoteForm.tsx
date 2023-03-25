import { Form, Stack, Row, Col, Button } from "react-bootstrap"
import CreatableReactSelect from "react-select/creatable"
import { Link, useNavigate } from "react-router-dom"
import { FormEvent, useRef, useState } from "react"
import { NoteData, Tag } from "../App"
import { v4 as uuidV4 } from "uuid"

type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
} & Partial<NoteData>

const NoteForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    })
    navigate("..")
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label className="text-white">Title</Form.Label>
              <Form.Control
                className="bg-dark bg-lighten-xl text-white"
                placeholder="add your title.."
                required
                ref={titleRef}
                defaultValue={title}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label className="text-white">Tags</Form.Label>
              <CreatableReactSelect
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
                    color: "red",
                  }),
                }}
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label }
                  onAddTag(newTag)
                  setSelectedTags((prev) => [...prev, newTag])
                }}
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
        <Form.Group controlId="markdown">
          <Form.Label className="text-white">Body</Form.Label>
          <Form.Control
            className="bg-dark bg-lighten-xl text-white"
            defaultValue={markdown}
            required
            as="textarea"
            rows={15}
            ref={markdownRef}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}

export default NoteForm
