import PageTitle from "../../../../components/events-page-title";
import EventForm from "./common/event-form";
function CreateEventPage() {
  return(
    <div className="mt-5 mx-5" >
    <PageTitle title="Create Event" />
    <EventForm initialData={{}} type='create' />
    </div>
  )
}

export default CreateEventPage;
