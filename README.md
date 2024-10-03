# Applied Angular Starter Project

This project has an Angular application created in the `frontend` directory.

This was created with:

```shell
ng new frontend --skip-git --skip-tests -t -s
```

A little bit of work has been done to it aside from the `ng new` command.


## Pre-Class Setup On This Project

I did a little bit of setup on this before class to optimize our time together.

### Mock Service Workers

The [msw](https://msw.io) library has been initialized. The instructions and information about this are in the course materials.

### TailwindCSS and DaisyUI

I initialized the Tailwind configuration for this. Again, details are in the course materials.

### `.npmrc`

I added an `.nprmc` so that `--legacy-peer-deps` are allowed. This is probably not a good idea for "real", "production" code, **but**, at the time of this writing some of the libraries we will explore haven't been updated to Angular 18 yet. 

## Starting the Application

Go to the directory where this file lives and type:

```shell
just code
```

