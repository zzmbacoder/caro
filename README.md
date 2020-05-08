# CBS Academic Rep Online (CARO)

CARO is a single page application (SPA) that collects different pieces of assignments & calendar events data from a user specified CBS Canvas learning system account and puts them all together on one page. In order to keep this app as simple as possible, CARO currently only retrieves from Canvas the course assignments & calendar events data for the CURRENT week. 

For example, let's say today is Tuesday Mar. 3rd 2020, CARO is going to retrieve the course related data from Canvas for this current week between Sunday. Mar. 1st 2020 and Saturday Mar. 7th.

# Get Started with Using CARO
* Before using CARO, make sure you have your Canvas access token ready. 
* Go to CARO in your web browser (for best user experience a desktop web browser is strongly recommended for now)
* Input your Canvas access token into the token text box and click **"Go!"**
* You also have the option to keep the token remembered by your local web browser by clicking the "Remember me" checkbox on the page.
* Voilà! You now should be able to see the assignments and calendar events data that CARO retrieves from Canvas and puts together for you on each day of the current week.

# Tech
CARO users a number of open source projects as well as AWS services to work propkerly, which includes:
* [ReactJS]
* [yarn]
* [AWS S3]
* [AWS Lambda]
* [AWS API Gateway] 
* [AWS CloudFront]

# Development
### Run CARO your local
Checkout the repo. Install the dependencies and start the SPA as following:
```sh
$ cd caro
$ yarn install
$ yarn start
```
This should start running CARO in your web browser.

[ReactJS]: <https://reactjs.org/>
[yarn]: <https://yarnpkg.com/>
[AWS S3]: <https://aws.amazon.com/s3/>
[AWS Lambda]: <https://aws.amazon.com/lambda/>
[AWS API Gateway]: <https://aws.amazon.com/api-gateway/>
[AWS CloudFront]: <https://aws.amazon.com/cloudfront/>