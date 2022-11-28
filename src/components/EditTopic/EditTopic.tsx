import { TopicData, Tag } from "../../App";
import TopicForm from "../TopicForm/TopicForm";
import { useTopic } from "../TopicLayout/TopicLayout";

type EditTopicProps = {
  onSubmit: (id: string, data: TopicData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const EditTopic = ({ onSubmit, onAddTag, availableTags }: EditTopicProps) => {
  const topic = useTopic();
  return (
    <>
      <h1 className="mb-3">Edit Topic</h1>
      <TopicForm
        subject={topic.subject}
        description={topic.description}
        tags={topic.tags}
        onSubmit={(data) => onSubmit(topic.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
};

export default EditTopic;
