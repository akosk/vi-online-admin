import MailChimp from './mailchimp';
import faker from 'faker';

MailChimp.getLists()
         .then((data)=> {
           console.log(data.lists[0].id);
           return data.lists[0].id;
         })
         .then(MailChimp.getList)
         .then((data) => {
           console.log(data.id, data.name);
           return data.id;
         })
         .then(MailChimp.getMembers)
         .then((data) => {
           const emails = data.members.map((i)=>i.email_address);
           console.log('List members before:', emails);
           return { listId: data.members[0].list_id, email_address: faker.internet.email() }
         })
         .then((data)=>MailChimp.postMember(data.listId, { email_address: data.email_address }))
         .then((data)=> {
           console.log(data);
         })
         .catch((err)=> {
           console.log('err', err);
         });


