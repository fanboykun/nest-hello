/* eslint-disable prettier/prettier */

import Group from "./Group";

type Members = {
    name: string;
    age: number;
    gender: 'male' | 'female';
    CurrentGroup?: Group | Omit<Group, "name"> | string;
    groupInfo? : Group
    realName?: string;
    formerGroup?: Group[] | Omit<Group, "name">[]
}

export default Members
