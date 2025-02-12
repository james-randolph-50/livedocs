type RoomAccess = 'room:write' | 'room:read';

interface Room {
 usersAccesses: {
   [email: string]: RoomAccess[]
 };
 metadata: any;
}

interface User {
 email: string;
 id: string;
 firstName?: string;
 lastName?: string;
 imageUrl?: string;
}

interface SearchParamProps {
 params: {
   id: string;
 };
}

import CollaborativeRoom from "@/components/CollaborativeRoom"
import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

const Document = async ({ params }: SearchParamProps) => {
 const { id } = params;
 const clerkUser = await currentUser();
 if(!clerkUser) redirect('/sign-in');

 const room = await getDocument({
   roomId: id,
   userId: clerkUser.emailAddresses[0].emailAddress,
 });

 if(!room) redirect('/');

 const userIds = Object.keys(room.usersAccesses);
 const users = await getClerkUsers({ userIds });

 const usersData = users.filter((user): user is User => user !== null).map((user) => ({
   ...user,
   userType: room.usersAccesses[user.email]?.includes('room:write')
     ? 'editor'
     : 'viewer'
 }));

 const currentUserType = room.usersAccesses[clerkUser.emailAddresses[0].emailAddress]?.includes('room:write') 
   ? 'editor' 
   : 'viewer';

 return (
   <main className="flex w-full flex-col items-center">
     <CollaborativeRoom 
       roomId={id}
       roomMetadata={room.metadata}
       users={usersData}
       currentUserType={currentUserType}
     />
   </main>
 )
}

export default Document