# CBS Academic Rep Online (CARO)

CARO is a single page application (SPA) that collects assignments & calendar events data on different days from a user specified CBS Canvas account and combine them all together on this single web page. In order to keep this app as simple as possible, CARO currently only retrieves the course assignments & calendar events data from Canvas for the CURRENT week. 

For example, let's say today is Tuesday Mar. 3rd 2020, CARO is going to retrieve the assignments and calendar events information from Canvas for this current week between Sunday. Mar. 1st 2020 and Saturday Mar. 7th.

# Get Started with Using CARO
* Before using CARO, make sure you have your Canvas token ready. 
* Go to CARO in your web browser (for best user experience a desktop web browser is strongly recommended)
* Input your Canvas token and click **"Go!"**
* You also have the option to have the token remembered by your local web browser by clicking the "Remember me" checkbox on the page.
* Voilà! You now should be able to see the assignments and calendar events data that CARO retrieves from Canvas and puts together for you on each day of the current week.
* Note, CARO does NOT store any access token itself.

# Tech
CARO uses a number of open source projects as well as AWS services to work propkerly. The tech stack includes:
* [ReactJS]
* [npm]
* [AWS S3]
* [AWS Lambda]
* [AWS API Gateway] 
* [AWS CloudFront]

# Development
### Run CARO on your local
Checkout the repo. Install the dependencies and start the SPA as following:
```sh
$ cd caro
$ npm install
$ npm start
```
This should start running CARO in your web browser.

### Build CARO locally
```sh
$ cd caro
$ npm run-script build
```

[ReactJS]: <https://reactjs.org/>
[npm]: <https://www.npmjs.com/>
[AWS S3]: <https://aws.amazon.com/s3/>
[AWS Lambda]: <https://aws.amazon.com/lambda/>
[AWS API Gateway]: <https://aws.amazon.com/api-gateway/>
[AWS CloudFront]: <https://aws.amazon.com/cloudfront/>