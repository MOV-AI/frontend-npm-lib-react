import { MasterDB } from "mov.ai-core";

class AnnotationManager {
  constructor() {
    if (instance) return instance;
    instance = this;
    this.annotations = {};
    this.observers = [];
    this.retrieveAnnotationsFromDb();
  }

  //========================================================================================
  /*                                                                                      *
   *                                   Getters & Setters                                  *
   *                                                                                      */
  //========================================================================================

  getAnnotations = () => this.annotations;

  /**
   *
   * @param {*} lambda: AnnotationManager -> {}
   */
  pushObserver(lambda) {
    this.observers.push(lambda);
  }

  //========================================================================================
  /*                                                                                      *
   *                                         Utils                                        *
   *                                                                                      */
  //========================================================================================

  retrieveAnnotationsFromDb() {
    MasterDB.subscribe(
      { Scope: "Annotation", Name: "*" },
      data => {
        console.log("Annotation update", data);
        const actionMap = {
          del: annotation => this.delAnnotation(annotation),
          set: annotation => this.addAnnotation(annotation)
        };
        const annotation = data.key.Annotation;
        actionMap[data.event](annotation);
        this.observers.forEach(f => f(this));
      },
      data => {
        console.log("Annotation start", data);
        const annotation = data.value.Annotation;
        this.addAnnotation(annotation);
      }
    );
  }

  delAnnotation(annotation) {
    if (!annotation) return;
    const names2delete = Object.keys(annotation).reduce((e, x) => {
      e.push(x);
      return e;
    }, []);
    Object.keys(this.annotations).forEach(annotationType => {
      const value = this.annotations[annotationType];
      value.names = value.names.filter(x => !names2delete.includes(x));
      value.labels = value.labels.filter(x => !names2delete.includes(x));
    });
  }

  addAnnotation(annotation) {
    if (!annotation) return;
    Object.keys(annotation).forEach(name => {
      const annotationObj = annotation[name];
      if (!annotationObj.Type) return;
      const type = annotationObj.Type.toLowerCase();
      const label = annotationObj.Label;
      if (!(type in this.annotations)) {
        this.annotations[type] = { names: [], labels: [] };
      }
      this.annotations[type].names.push(name);
      this.annotations[type].labels.push(label ? label : name);
    });
  }

  //========================================================================================
  /*                                                                                      *
   *                                        Static                                        *
   *                                                                                      */
  //========================================================================================

  static getInstance() {
    return new AnnotationManager();
  }

  static getAnnotations() {
    return AnnotationManager.getInstance().getAnnotations();
  }
}
let instance = null;
export default AnnotationManager;
