import SelectItem from "@/objects/SelectItem";

export default {
  id: 0,
  name: "",
  address: "",
  scope: SelectItem,
  scope_id: 0,
  note: "",
  emails: [],
  phones: [],
  faxes: [],
  practices: [
    {
      id: 0,
      date_str: "",
      kind_name: "",
      topic: "",
    },
  ],
  contacts: [
    {
      id: 0,
      name: "",
      department_name: "",
      post_name: "",
      post_go_name: "",
    },
  ],
};
