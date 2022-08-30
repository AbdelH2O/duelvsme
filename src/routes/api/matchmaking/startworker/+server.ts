import { json } from '@sveltejs/kit';
import producer, { job } from "$lib/utils/owl";
import Cf from "cf-wrapper";
import client from "$lib/utils/redisClient";
import fs from "fs";
import process from 'process';

export const POST = async () => {
    const started = await client.get('back');
    if (started === 'true') {
        return json({
            message: 'background worker is already running.',
        }, {
            status: 400
        });
    }
    // const content = fs.readFileSync(process.cwd() + '/src/users.txt', 'utf8');
    const content = `Duelbot1@yopmail.com;Iz9rPJzInY
    Duelbot3@yopmail.com;zKBjh8gmQK
    Duelbot4@yopmail.com;D0RjGjXoet
    Duelbot5@yopmail.com;ukaHgCqP6J
    Duelbot6@yopmail.com;p7P9K4QFJs
    Duelbot7@yopmail.com;fUeZAUmueh
    Duelbot8@yopmail.com;YwCoRtBFSH
    Duelbot9@yopmail.com;y6e5KngLU0
    Duelbot10@yopmail.com;5AON9nOmZh
    Duelbot11@yopmail.com;Mq3m6QGTK3
    Duelbot12@yopmail.com;4yUOEknm8E
    Duelbot13@yopmail.com;XCZbRutJYG
    Duelbot14@yopmail.com;dO0BsnAD47
    Duelbot15@yopmail.com;yExmVvI3jx
    Duelbot16@yopmail.com;9SfFblfJDF
    Duelbot17@yopmail.com;Di1lzWqVuF
    Duelbot18@yopmail.com;izovJkpeMY
    Duelbot19@yopmail.com;jc1YeU9cxm
    Duelbot20@yopmail.com;ii0P5hvLME
    Duelbot21@yopmail.com;Ksv0zCopc3
    Duelbot22@yopmail.com;8mGh7zz2mz
    Duelbot23@yopmail.com;6J2JYgT6X4
    Duelbot24@yopmail.com;iOWO83yy3k
    Duelbot25@yopmail.com;u7DdhmTJCu
    Duelbot26@yopmail.com;1Zb6L3ksW0
    Duelbot27@yopmail.com;qs20hC7N55
    Duelbot28@yopmail.com;kPW3l1HCH6
    Duelbot29@yopmail.com;gP7o2DHKmg
    Duelbot30@yopmail.com;pCwaAugVZV
    Duelbot31@yopmail.com;S8tQF5pj1Y
    Duelbot32@yopmail.com;eNNTNzeH1w
    Duelbot33@yopmail.com;iwqNkz0ULB
    Duelbot34@yopmail.com;tyELUAmoeB
    Duelbot35@yopmail.com;rFbJhiViHk
    Duelbot36@yopmail.com;XHqpz9gr9G
    Duelbot37@yopmail.com;6UsSAskIq0
    Duelbot38@yopmail.com;UXx4xk1Qzm
    Duelbot39@yopmail.com;jnpmkvb1uT
    Duelbot40@yopmail.com;rzEUCUa3pq
    Duelbot41@yopmail.com;XoPy5glFY8
    Duelbot42@yopmail.com;O3IqP4bZH2
    Duelbot43@yopmail.com;o3faf0XhMf
    Duelbot44@yopmail.com;kqq9vcMfqU
    Duelbot45@yopmail.com;YW5oNJtupa
    Duelbot46@yopmail.com;9NgdAmSEtF
    Duelbot47@yopmail.com;9n7N6vdL1u
    Duelbot48@yopmail.com;ObFGOB8P0Q
    Duelbot49@yopmail.com;ifEKZINMEu
    Duelbot50@yopmail.com;1LTf2cQf8T
    Duelbot51@yopmail.com;C7QU8xZ4W8
    Duelbot52@yopmail.com;KF2kD5N7XR
    Duelbot53@yopmail.com;D977e5cyiE
    Duelbot54@yopmail.com;dBbVVApUAS
    Duelbot55@yopmail.com;uDxZAkqcJu
    Duelbot56@yopmail.com;b0RKMKAsPv
    Duelbot57@yopmail.com;d9c8LXj2tB
    Duelbot58@yopmail.com;i9ilyuIDbo
    Duelbot59@yopmail.com;hTJrlveYY1
    Duelbot60@yopmail.com;gGP3mQE05v
    Duelbot61@yopmail.com;f1VoD2gwSV
    Duelbot62@yopmail.com;IJ8zjlEi0k
    Duelbot63@yopmail.com;wRfdlPoaVK
    Duelbot64@yopmail.com;u7rR0QSAxk
    Duelbot65@yopmail.com;LgyYBqxCnG
    Duelbot66@yopmail.com;SUNqb8gV67
    Duelbot67@yopmail.com;0TB3OCIyBE
    Duelbot68@yopmail.com;tFZ3RTofNk
    Duelbot69@yopmail.com;UvhQZIULdV
    Duelbot70@yopmail.com;CyTR0egCYp
    Duelbot71@yopmail.com;1cndg0v9CC
    Duelbot72@yopmail.com;3Owetu6cby
    Duelbot73@yopmail.com;zcc34PTrWQ
    Duelbot74@yopmail.com;EK96WPbQDT
    Duelbot75@yopmail.com;9rGCQSu4Mm
    Duelbot76@yopmail.com;CEygxSHtjy
    Duelbot77@yopmail.com;PovBCn71qI
    Duelbot78@yopmail.com;XrdDEK938w
    Duelbot79@yopmail.com;ddma0kHx5I
    Duelbot80@yopmail.com;4IYHRWJzMW
    Duelbot81@yopmail.com;YzSF6lMK2P
    Duelbot82@yopmail.com;KgeM56teLP
    Duelbot83@yopmail.com;1CesNoRMQz
    Duelbot84@yopmail.com;oSQNcyEIar
    Duelbot85@yopmail.com;1FF6Q2YpYS
    Duelbot86@yopmail.com;TYHeoMiq10
    Duelbot87@yopmail.com;VpN3NE0mtS
    Duelbot88@yopmail.com;nnjuvn62Cc
    Duelbot89@yopmail.com;GqEbhXfll6
    Duelbot90@yopmail.com;pcRPNxlSHh
    Duelbot91@yopmail.com;MwVfV1CTrg
    Duelbot92@yopmail.com;wApedTJp9R
    Duelbot93@yopmail.com;PDxylWqvVf
    Duelbot94@yopmail.com;ReVngtrTWq
    Duelbot95@yopmail.com;d2ZOfwCHiN
    Duelbot96@yopmail.com;UoEr65fh3s
    Duelbot97@yopmail.com;tl3nJu1d5Q
    Duelbot98@yopmail.com;Lmwz2ETKrp
    Duelbot99@yopmail.com;2iQGrV471g
    Duelbot100@yopmail.com;vWePiDMPBC
    Duelbot101@yopmail.com;Qt8Ufe8JBu`;
    const accounts = content.split('\n');
    for (const account of accounts) {
        await client.sAdd('accounts', account);
    }
    const cf = new Cf('svelte', 'svelte');
    const problems = await cf.getProblemsList();
    problems.sort((a, b) => a.rating - b.rating);
    for (const problem of problems) {
        await client.sAdd(`${problem.rating}`, JSON.stringify(problem));
        // await client.zAdd('problems', [{score: problem.rating, value: JSON.stringify(problem)}]);
    }
    producer.enqueue({
        queue: "queue",
        id: `${Math.floor(new Date(Date.now() + 15000).getTime()/1000)}`,
        payload: "test",
        runAt: new Date(Date.now() + 15000),
    });
    await job.start();
    await client.set('back', 'true');
    return json({
        message: "ok"
    });
}