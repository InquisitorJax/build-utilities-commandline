@import './../../jspm_packages/npm/pragma-views@0.0.x/scss/lib/variables.scss';
@import './../../jspm_packages/npm/pragma-views@0.0.x/scss/lib/mixins.scss';
@import './../../jspm_packages/npm/pragma-views@0.0.x/scss/lib/colors.scss';

.toolbar {
  icon[name="search"] {
    opacity: 0.5;
  }

  icon {
    margin-top: 0.4rem;
  }

  input {
    @include stretch();
    margin-left: $default-padding;
    margin-right: $default-padding;
  }

  ul {
    margin: $default-padding;
  }
}

ul[role="list"] {
  position: absolute;
  top: $options-toolbar-height;
  left: 0;
  right: 0;
  bottom: 0;
}