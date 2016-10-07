import * as generalModel from '../models/generalModel';
import _ from 'lodash';
import MailChimp from '../lib/mailchimp';

import log from '../lib/nodelogger';

class MailChimpController {

  static export(req, res) {


    // töröljük a szegmenst, ha van ilyen

    // létrehozzuka szegmenst

    // hozzáadjuk szegmenshez a userekt

    const { users, filter_name }=req.body;
    let site, newSegment;
    generalModel.find('site', '1')
                .then((s)=> {
                  log.debug(s);
                  site = s;
                  MailChimp.API_KEY = site.mailchimp.api_key;
                  return site.mailchimp.list_id;
                })
                .then(MailChimp.getMembers)
                .then((data)=> {
                  const emails = data.members.map((m)=>m.email_address);
                  log.debug('Subscribed emails', emails);
                  const sortedEmails = _.sortBy(emails);
                  log.debug('Sorted Subscribed emails', sortedEmails);

                  const newUsers = users.filter((item)=> {
                      const index = _.sortedIndexOf(sortedEmails, item.email);
                      return index === -1;
                    }
                  );

                  log.debug('New users', newUsers);
                  return newUsers;
                })
                .then((newUsers)=> {
                  const userPromises = newUsers.map((u)=> {
                    return MailChimp.postMember(site.mailchimp.list_id, {
                      email_address: u.email
                    });
                  });
                  return Promise.all(userPromises);
                })
                .then(()=> {
                  return MailChimp
                    .getSegments(site.mailchimp.list_id)
                    .then((data)=> {
                      let segment = data.segments.find((i)=> {
                        return i.name === filter_name;
                      });
                      if (segment) {
                        return MailChimp.deleteSegment(site.mailchimp.list_id, segment.id);
                      }
                    });
                })
                .then(()=> {
                  return MailChimp
                    .postSegment(site.mailchimp.list_id, { name: filter_name })
                    .then((segment)=> {
                      newSegment = segment;
                    });
                })
                .then(()=> {
                  log.debug('saving users to segment',users);
                  const segmentUserPromises = users.map((u)=> {
                    MailChimp.postMemberToSegment(
                      site.mailchimp.list_id,
                      newSegment.id,
                      {
                        email_address: u.email,
                        status: 'subscribed'
                      });
                  });
                  return Promise.all(segmentUserPromises);
                })
                .then(()=>{
                  return res.send('ok');
                })

                .catch((err)=> {
                  log.debug(err);
                  res.status(500);
                  return res.send(err);
                });

  }


}

export default MailChimpController;
