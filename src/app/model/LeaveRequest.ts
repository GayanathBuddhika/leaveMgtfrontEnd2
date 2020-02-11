import { User } from './User';

export class LeaveRequest{
    id: string;
    ai: string;
    description: string;
    leaveType: LeaveRequest;
    user: User;
    startDate: string;
    endDate:string; 
    status:string;
    
}