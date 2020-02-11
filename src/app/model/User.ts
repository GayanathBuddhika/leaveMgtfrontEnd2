import { Department } from 'app/model/Department';

export class User{
    id: string;
    ai: string;
    employeeId: string;
    firstName: string;
    userType: string;
    email: string;
    phoneNo: string;
    address: string;
    department: Department;
    lastName: string;
    edit: Boolean = false;
}
