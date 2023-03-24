import { Card, Stack, Badge } from "react-bootstrap"
import { Link } from "react-router-dom"
import styles from "./NoteList.Modules.css"
// import styles from "./NoteList.Modules.css?inline"
import { Tag } from "../App"
export type NoteCardProps = {
  tags: Tag[]
  title: string
  id: string
}

const NoteCard = ({ id, title, tags }: NoteCardProps) => {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none bg-dark mt-4  ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5 text-white text-center mb-2">{title}</span>
          {tags.length > 0 && (
            <Stack
              gap={2}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
              {tags.map((tag) => (
                <Badge className="text-truncate bg-info" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  )
}

export default NoteCard
