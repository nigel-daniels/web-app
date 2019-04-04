/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React from 'react';
import Debug from 'debug';

let debug = Debug('Reset');

export default class Reset extends React.Component {

   render () {
       debug('rendering');
       debug('env = ' + this.props.env);
       return (
           <html lang="en">
               <head>
                   <meta charSet="utf-8"/>
                   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

                   <title>Base Web App</title>
               </head>

               <body>
                   <div id="app">
                       {this.props.children}
                   </div>

                   <script id="app-script" type="text/javascript" src="client.js" data-env={this.props.env} id={this.props.id}></script>

               </body>
           </html>
       );
   }
}
