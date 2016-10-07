import MailChimp from './mailchimp';
import config from '../config';
import faker from 'faker';


MailChimp.API_KEY = config.mailchimp.api_key;

let newMember, viList, newSegment;

//MailChimp.getLists()
//         .then((data)=> {
//           viList = data.lists[0];
//           return viList.id;
//         })
//         .then(MailChimp.getList)
//         .then((list) => {
//           console.log(list.id, list.name);
//           return viList.id;
//         })
//         .then(MailChimp.getMembers)
//         .then((data) => {
//           const emails = data.members.map((i)=>i.email_address);
//           console.log('List members before:', emails);
//         })
//         .then(()=> {
//           return MailChimp.postMember(viList.id, { email_address: faker.internet.email() })
//         })
//         .then((data)=> {
//           newMember = data;
//         })
//         .then(()=>{
//           return MailChimp.getSegments(viList.id)
//             .then((data)=>{
//               console.log(data.segments.map((i)=>i.name));
//             });
//         })
//         .then(()=> {
//           return MailChimp.postSegment(viList.id, { name: faker.company.companyName() })
//         })
//         .then((segment)=> {
//           newSegment=segment
//         })
//         .then(()=>{
//           return MailChimp.postMemberToSegment(viList.id, newSegment.id,  newMember)
//         })
//         .then(()=> {
//           return MailChimp.getSegmentMembers(viList.id,newSegment.id);
//         })
//         .then((data)=>{
//         })
//
//         .catch((err)=> {
//           console.log('err', err);
//         });


