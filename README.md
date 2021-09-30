# ungenotes
This project is aimed toward a nice, customized note editor for the german youtuber Unge.

## Development Quick start
To begin the development with this app, you need `node` and `yarn` installed.
Just checkout the repository, `cd` into the root project folder and run

```bash
yarn install
```

This installs all the necessary dependencies.

As we're using [sass](https://sass-lang.com/) instead of plain css, `sass` must also be installed on the development system.
It can be installed via 

```bash
npm install -g sass
```

or by following the [other official instructions](https://sass-lang.com/install).

Now, start the electron app with

```bash
yarn run start
```

That's it. Now, you can start editing the code, e.g. in _VS Code_ or _Webstorm_, and enjoy the live reloading.

## Contribution
### Commit Style
Please note that we use the style of [conventional commits](https://www.conventionalcommits.org/en) for our commits in this repository.
They provide several benefits over generic commit styles, such as the possibility to base versioning on them.

If you want to contribute to this project, please adhere to the conventional commit rules.

### Branches
The active branch for development is the corresponding branch `development`.
It is used as a merge target for other, feature related merges and merge requests.
It can, but not necessarily should, be used by project members for development.

The `development` branch is then merged from time to time into the `main` branch.
This should be done via a merge request that should be approved by at least one other person.
