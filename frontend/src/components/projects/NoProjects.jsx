import React from 'react';

const NoProjects = () => (
  <React.Fragment>
    <h2 className="pb-4 border-bottom">Projects</h2>
    <div className="my-5">
      <h4>There is no project yet.</h4>
      <p>You need to:</p>
      <ol>
        <li>
          set up a database
          <br />
          <code>chainerui db create</code>
          <br />
          <code>chainerui db upgrade</code>
        </li>
        <li>
          create a project, for example,
          <br />
          <code>chainerui project create -d PROJECT_DIR [-n PROJECT_NAME]</code>
        </li>
      </ol>
    </div>
  </React.Fragment>
);

export default NoProjects;
