import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
import { Topic } from "../../App";

type TopicLayoutProps = {
    topics: Topic[]
}

export default function TopicLayout({ topics }: TopicLayoutProps) {
    const { id } = useParams();
    const topic = topics.find(t => t.id === id);

    if (topic == null) return <Navigate to='/' replace />
  return <Outlet    context={topic} />                 
}

export function useTopic() {
    return useOutletContext<Topic>()
}


