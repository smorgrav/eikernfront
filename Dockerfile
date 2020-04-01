#
# JAVA needed for firebase emulators
#
FROM openjdk:8-jdk-buster

#
# NODE JS and NPM (~120MB)
#
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash
RUN apt-get install nodejs && apt-get clean

#
# CHROME DEV and PUPPETEER (~400MB)
#
RUN  apt-get update \
     # See https://crbug.com/795759
     && apt-get install -yq libgconf-2-4 \
     # Install latest chrome dev package, which installs the necessary libs to
     # make the bundled version of Chromium that Puppeteer installs work.
     && apt-get install -y wget --no-install-recommends \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update \
     && apt-get install -y google-chrome-unstable --no-install-recommends \
     && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

#
# YARN (~8MB)
# Thouch bashrc to have yarn install script populate it with PATH
#
RUN touch .bashrc
RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.21.1
ENV PATH=/root/.yarn/bin:$PATH

#
# FIREBASE (~61MB)
#
ENV FIREBASE_TOOLS_VERSION=7.12.1
RUN yarn global add firebase-tools@${FIREBASE_TOOLS_VERSION} && \
    yarn cache clean && \
    firebase -V && \
    mkdir $HOME/.cache

RUN firebase setup:emulators:database

ENTRYPOINT ["/bin/bash", "-c"]