import Email from "@/objects/Email";
import Phone from "@/objects/Phone";
import Fax from "@/objects/Fax";
import SelectItem from "@/objects/SelectItem";

export default {
  id: 0,
  name: "",
  address: "",
  birthday: "",
  company: SelectItem,
  company_id: 0,
  post: SelectItem,
  post_id: 0,
  department: SelectItem,
  department_id: 0,
  post_go: SelectItem,
  post_go_id: 0,
  rank: SelectItem,
  rank_id: 0,
  emails: [Email],
  phones: [Phone],
  faxes: [Fax],
  note: ""
};
