<template>
  <h1><center>Welcome to my APRFramework</center></h1>
  <br />
  <div id="main_content">
    <h4>
      This website was used throughout the development of my Masters project to
      aid the development, testing and writing of my report.
    </h4>
    <br />

    <p style="text-align: left; margin-left: 6rem">
      <b>Github links:</b>
      <ul>
        <li><a href="https://github.com/fentonreid/APRFramework">Vue Website</a></li>
        <li><a href="https://github.com/fentonreid/APRFrameworkVue">APRFramework</a></li>
        </ul>
    </p>

    <br />
    <p style="text-align: left; margin-left: 6rem">
      <b> Main usages for this website:</b>
    </p>
    <ul>
      <li>
        <a href="progresslog">Progress Log</a> - All time spent on the project
        was logged and a suitable description of what was done was recorded to
        provide a timeline of implementation from start to finish
      </li>
      <li>
        <a href="patchviewer">Patch Viewer</a> - All valid Defects4j bugs were
        uploaded to the patch viewer. From here each bug could be classified to
        one of the three implemented mutation operators, partial (meaning part
        of the bug can be solved) or other, meaning no suitable mutation was
        found
      </li>
      <li>
        <a href="mutationoperators">Mutation Operators</a> - The mutation
        operator description, implementation details and examples with relevant
        test case id are recorded for all implemented mutation operators. The
        designed mutation operators follow a tree structure with leaf nodes
        implementing one type of mutation and the root nodes implementing all
        children (which allows for more complex and diverse mutations)
      </li>
      <li>
        <a href="generatedpatches">Generated Patches</a> - All patches generated
        by the Java implemented genetic program are uploaded to this website
        where they can be inspected. Inspection is necessary to determine if the
        patch in question is overfit and therefore invalid, or a valid patch.
        The developer fix and the GP fix are placed side by side for easier
        classification
      </li>
      <li>
        <a href="javadoc">Javadoc</a> - Is used for documentation generation,
        javadoc allows for source code docstrings to be stored in an HTML format
        that can then be placed locally on this website for convenience. These
        include all the gp, mutation operator and yaml parsing classes and
        methods used for the APRFramework to function
      </li>
    </ul>

    <br />
    <p style="text-align: left; margin-left: 6rem">
      <b>Test cases implemented:</b>
    </p>
    <ul>
      <li style="margin-bottom: 0.5rem">
        <em>YAMLParsing</em> - Parsing the YAML
      </li>
      <ul>
        <li style="margin-bottom: 0.3rem">GP Object</li>
        <li style="margin-bottom: 0.3rem">Defects4J Object</li>
        <li style="margin-bottom: 1.5rem">Output Object</li>
      </ul>
      <li style="margin-top: 0.5rem; margin-bottom: 0.5rem">
        <em>MutationOperators</em> - All Mutation operator example tests for
      </li>
      <ul>
        <li style="margin-bottom: 0.3rem">BEM</li>
        <li style="margin-bottom: 0.3rem">BERExpansion</li>
        <li style="margin-bottom: 0.3rem">BERReduction</li>
        <li style="margin-bottom: 0.3rem">GNR</li>
        <li style="margin-bottom: 0.3rem">LRRelocation</li>
        <li style="margin-bottom: 0.3rem">LRRemoval</li>
        <li style="margin-bottom: 1.5rem">SPM</li>
      </ul>

      <li style="margin-bottom: 0.5rem"><em>Util</em></li>
      <ul>
        <li style="margin-bottom: 0.3rem">
          The csv details of generated patches
        </li>
        <li style="margin-bottom: 0.3rem">
          Project paths used for getting buggy and fixed Defects4J bugs
        </li>
        <li style="margin-bottom: 0.3rem">
          Process builder used to interact and collect standard input from the
          CLI
        </li>
      </ul>
    </ul>
    <br />

    <p style="text-align: left; margin-left: 6rem">
      <b>How to create a new mutation operator</b>
    </p>
    <ol>
      <li style="margin-bottom: 0.3rem">
        Create a new Java class in the /src/main/java/MutationOperators
        directory
      </li>
      <li style="margin-bottom: 0.3rem">The class must be final</li>
      <li style="margin-bottom: 0.3rem">
        The class must also implement a static method name 'mutate'
      </li>
      <li style="margin-bottom: 0.3rem">
        This mutate method takes as a parameter a 'CompilationUnit' any name is
        fine but 'program' is standardised throughout all current mutation
        operators
      </li>
      <li style="margin-bottom: 0.3rem">
        The specific implementation details of the mutation are up to you but
        the mutate method must end by cloning the program as such: 'return
        program.clone()'
      </li>
    </ol>

    <br />
    <p style="text-align: left; margin-left: 6rem">
      <b>Understanding the YAML configuration file</b>
    </p>
    <p style="text-align: left; margin-left: 6rem">
      The YAML configuration file consists of three main objects
    </p>

    <ul>
      <li style="margin-bottom: 0.3rem">GP</li>
      <ul>
        <li style="margin-bottom: 0.3rem">
          Generations - The number of generations the GP will run for
        </li>
        <li style="margin-bottom: 0.3rem">
          Population Size - The number of individuals to be mutated per
          generation
        </li>
        <li style="margin-bottom: 0.3rem">
          Mutation Rate - The percentage chance that each individual should be
          mutated a value from 0 to 1
        </li>
        <li style="margin-bottom: 0.3rem">
          Mutation Operators - A list of mutation operator classes as found in
          /src/main/java/GP/MutationOperators
        </li>
        <li style="margin-bottom: 0.3rem">
          Iterations Per Bug - The number of times each bug should be run for
          each mutation operator
        </li>
        <li style="margin-bottom: 1.5rem">
          Number Of Threads Per Bug - The number of threads that should be used
          in the GP, must be divisible by the population size and greater than
          zero
        </li>
      </ul>
    </ul>
    <ul>
      <li style="margin-bottom: 0.3rem">Defects4J</li>
      <ul>
        <li style="margin-bottom: 0.3rem">
          TestCaseSelection - The YAML object that contains the selection type
          and list of Defects4J bugs to use
        </li>
        <ul>
          <li style="margin-bottom: 0.3rem">
            Method - The way in which we select bugs currently 'identifier' to
            select a range of bugs or 'all' to select all valid Defects4J bugs
          </li>
          <li style="margin-bottom: 0.3rem">
            Selection - If the method type is 'identifier' then key:value pairs
            are chosen, the Defects4j project to a list of bug id's, either a
            single bug [1] or a range [1-3] and can be combined such as; [1,
            3-5], alternatively, all can be selected e.g. Lang: [all]
          </li>
        </ul>
      </ul>
    </ul>
    <ul>
      <li style="margin-bottom: 0.3rem">Output</li>
      <ul>
        <li style="margin-bottom: 0.3rem">
          Csv - The name of the generated csv file for each selected bug
        </li>
        <li style="margin-bottom: 0.3rem">
          Javadoc - Uploading of the HTML documentation for the project to the
          /javadoc directory, a boolean type
        </li>
        <li style="margin-bottom: 0.3rem">
          UploadToPatchViewer - All valid Defects4J bugs to be uploaded to
          firebase for use on the /patchviewer page, a boolean type
        </li>
        <li style="margin-bottom: 1.5rem">
          Gp - To run the GP with the given config details, a boolean type
        </li>
      </ul>
    </ul>
  </div>
</template>

<style scoped>
#main_content {
  margin-left: 5rem;
  text-align: center;
}

li {
  margin-bottom: 0.8rem;
  margin-left: 5rem;
  text-align: left;
  max-width: 70rem;
  word-wrap: break-word;
}
</style>
