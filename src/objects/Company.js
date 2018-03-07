import Email from '@/objects/Email'
import Phone from '@/objects/Phone'
import Fax from '@/objects/Fax'
import SelectItem from '@/objects/SelectItem'

export default {
  id: 0,
  name: '',
  address: '',
  scope: SelectItem,
  scope_id: 0,
  note: '',
  emails: [Email],
  phones: [Phone],
  faxes: [Fax],
  practices: [{
    id: 0,
    date_str: '',
    kind_name: '',
    topic: ''
  }],
  contacts: [{
    id: 0,
    name: '',
    department_name: '',
    post_name: '',
    post_go_name: ''
  }]
}
