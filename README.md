娘達（双子・6歳）も早いもので来年から小学生。就学前に春先から公文式に通い始めました。毎日行う宿題を家族皆でアシスト出来る様な仕組みを考えてみました。

## 公文式学習法

![](https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Kumon_Method_Logo.svg/1200px-Kumon_Method_Logo.svg.png)

> 公文式の特長 ～ 公文式学習とは解き方を教わるのではなく、自分の力で教材の問題を解く学習法で、「やればできる」という自己肯定感を育み、未知の領域にも、自分から挑戦する力を培う。公文式は、一人ひとりの「可能性の追求」を目指す教育です。 - 公式HPより

![home-work-time-3.png](https://qiita-image-store.s3.amazonaws.com/0/47128/fe9d0281-0868-196a-f7ce-138baa66ffaf.png)

ご自分がやられていた方も多いと思います。独自の教材を利用して、自分で学ぶ力を身につけていきます。

算数であれば毎日10分の間に教材10枚を解答します。早く、正確に練習していくことがポイントになります。

## 家族で共有する

宿題に掛かった時間は未就学児の場合は親が記入します。電子工作機器を利用してこんな仕組みを考えてみました。

![DSC_0132.jpg](https://qiita-image-store.s3.amazonaws.com/0/47128/ea0f38d5-45d4-91c5-1f00-651ea8a0d036.jpeg)

Seeed社のWioNodeとGroveシステムを使用したタイマーを利用します。ボタンを押すと10分のカウントダウンが始まります。終了したタイミングでボタンを押し、掛かった時間を計測する事が出来ます。（10分以上経過した場合はタイマーは自動で終了します）

ちょっとこだわったポイントは、子供が毎日使うものなので単3電池3本で駆動させている事です。電源を入れるとRaspberryPiに立てたサーバーとwebsocketで接続されます。

計測した時間はIFTTT経由で様々なサービスへ送信する事が可能になります。lineに送信することも出来ますので、両親への通知・共有が簡単に行えます。ここでは宿題通知用に作成したlineグループに計測した時間を地通知しています。

![home-work-time-1.png](https://qiita-image-store.s3.amazonaws.com/0/47128/a7fefdb5-b8f8-a81b-119b-227773c99afe.png)

外出先からも宿題が終わったタイミングを通知で確認することが出来ます。

![home-work-time-8.png](https://qiita-image-store.s3.amazonaws.com/0/47128/ca3492ce-343c-fbdb-cab4-fb4439823a33.png)


合わせてGoogleSpreadSheetsに学習時間を書き込める様にしてみました。学習した日にちと計測時間と合わせ、10分以上経過した場合は後で見直しが出来る様印を付けておきます。

## GoogleAssistantで見守る

SpreadSheetsを開けば詳細を確認出来るのですが、サポート役としてGoogle Assistantを活用してみることにしました。

[Homework Time - Google Assistant app - Youtube](https://www.youtube.com/watch?v=tJtANzVOpB8)

GoogleSpreadSheetsのAPIを利用して、GoogleAssistantから学習状況を確認出来ます。こんな感じ。

![Video Caption Maker 2017-07-29 19-04-11.png](https://qiita-image-store.s3.amazonaws.com/0/47128/f01e4750-3b17-ad21-c085-f2fb84b02617.png)

API.aiのintentsを利用して、SpreadSheetのデータを呼び出します。ここでは「名前＋日付」で検索します。「長女（Yolanda-仮名）＋日付（Today-ここでは2017年7月29日）」のjsonデータをActions on Googleにリクエストします。

日付はAPI.aiのentityを利用するので、「yesterday（昨日）」「day before yesterday（一昨日）」「two days ago（二日前）」など口語調で出した意図を汲み取ってくれます。

![Video Caption Maker 2017-07-29 19-04-37.png](https://qiita-image-store.s3.amazonaws.com/0/47128/51617da5-d7f7-c595-bbbf-d98f9ee9518e.png)

この日は休日で朝から宿題をやったので、10時4分から10時11分まで掛かった事が分かります。

日にちだけの確認だけでなく、期間を指定して、10分の時間内に宿題が出来たかどうかを確認出来る様にしてみました。こんな感じです。

![Video Caption Maker 2017-07-29 19-29-12.png](https://qiita-image-store.s3.amazonaws.com/0/47128/638fcaf3-6ee9-2189-c7a9-ba10105b0d1e.png)

ここでは「名前＋期間」で検索します。「次女（Amanda-仮名）＋期間（Last week-ここでは2017年7月17日から2017年7月23日）」のjsonデータをActions on Googleにリクエストします。

期間もAPI.aiのentityを利用します。「last week（先週）」「this month（今月）」「last month（先月）」など口語で指定した期間を、意図通りに汲み取ってくれます。

![Video Caption Maker 2017-07-29 19-29-32.png](https://qiita-image-store.s3.amazonaws.com/0/47128/653af972-075e-4d8e-dbe7-6c15f8eb971a.png)

時間以内に宿題が出来た回数と出来なかった回数を教えてくれます。

![home-work-time-2.png](https://qiita-image-store.s3.amazonaws.com/0/47128/9422b34e-3d73-5d54-3244-5f7be3c51686.png)

宿題は毎回先生が採点してくれています。解答が正解している事だけでなく、時間以内に出来ているかも次にステップに進むポイントになります。

Google Assistantで事前に確認しておけば、ポイントを絞って一緒に見直ししてあげる事が出来ますね。

## 仕組み

### Wio Node & IFTTT

![wio-node (1).png](https://qiita-image-store.s3.amazonaws.com/0/47128/bcb65a49-82da-6147-ba9f-484e97236e3e.png)


## Raspberry Pi & Google Assistant SDK

![google-assistant.png](https://qiita-image-store.s3.amazonaws.com/0/47128/63ef4e98-99aa-452e-ee0c-5f1bc449ad66.png)

## まとめ

双子の仮の名前として、映画「パルプフィクション」の登場人物「ハニー・バニー」ことYolandaと、その役を演じた女優Amanda Plummerさんからつけてみました。どうでもいいですね。
