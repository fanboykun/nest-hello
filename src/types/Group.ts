/* eslint-disable prettier/prettier */
import Members from "./Members";

type Group = {
    name : string;
    memberCount? : number;
    agency? : string;
    debutYear? : number
    members? : Members[] 
}

export default Group

