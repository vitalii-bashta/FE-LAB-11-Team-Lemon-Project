export interface EventData {
    category: string,
    eventName: string,
    date: Date | string,
    location: {
        name: string, 
        url: string
    },
    manager: string,
    members: string[],
    needVolunteers: number,
    organization: string,
    time: {
        hours: number,
        minutes: number,
    },
    id: string, 
    body: string, 
    urlImage: string,
}
