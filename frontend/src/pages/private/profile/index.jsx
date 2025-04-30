import PageTitle from "../../../components/events-page-title";
import { useSelector } from "react-redux";
import { formatDate} from '../../../utils/dateformatter'

function profile() {
  const user = useSelector((state) => state.user.value);

  const renderUsersProperty = (label, value) => {
    return <div className="flex flex-col text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-800 font-semibold">{value}</span>
    </div>
  }

  return (
    <div className="mt-5 mx-5">
      <PageTitle title='Profile'/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
      {renderUsersProperty('User ID', user._id)}
      {renderUsersProperty("Name", user.name)}
      {renderUsersProperty("Email", user.email)}
      {renderUsersProperty('Joined At', formatDate(user.createdAt))}
      </div>
    </div>
  )
}

export default profile