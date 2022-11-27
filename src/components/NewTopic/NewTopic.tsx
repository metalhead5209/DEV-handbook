import { TopicData, Tag } from "../../App";
import TopicForm from "../TopicForm/TopicForm";

type NewTopicProps = {
  onSubmit: (data: TopicData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const NewTopic = ({ onSubmit, onAddTag, availableTags }: NewTopicProps) => {
  return (
    <>
      <h1 className="mb-3">New Topic</h1>
      <TopicForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
};

export default NewTopic;
