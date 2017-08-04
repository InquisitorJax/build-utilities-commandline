@import './../../jspm_packages/npm/pragma-views@0.0.x/scss/lib/variables.scss';

.md-layout {
  position: absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;

  display: grid;
  grid-template-rows: 2rem 100%;

  .toolbar {
    grid-row: 1;
  }

  .body {
    grid-row: 2;
    position: absolute;
    left:0;
    top:0;
    bottom:0;
    right:0;
  }

  master-detail {
    position: absolute;
    left:0;
    right:0;
    bottom:0;
    top:0;
    width: inherit;
    height: inherit;

    ul {
      width: 100%;
      height: 100%;
    }
  }
}