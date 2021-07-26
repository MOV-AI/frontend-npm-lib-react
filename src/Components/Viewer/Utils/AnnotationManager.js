import { MasterDB } from "@mov-ai/mov-fe-lib-core";

class AnnotationManager {
  constructor() {
    if (instance) return instance;
    instance = this;
    this.annotations = {};
    this.observersBySceneId = {};
  }

  //========================================================================================
  /*                                                                                      *
   *                                   Getters & Setters                                  *
   *                                                                                      */
  //========================================================================================

  getAnnotations = () => this.annotations;

  load() {
    this.retrieveAnnotationsFromDb();
    return this;
  }
  /**
   *
   * @param {*} scene: Scene
   * @param {*} lambda: AnnotationManager -> {}
   */
  pushObserver(scene, lambda) {
    const sceneId = scene._uid;

    if (!(sceneId in this.observersBySceneId)) {
      this.observersBySceneId[sceneId] = [];
    }
    this.observersBySceneId[sceneId].push(lambda);
    return this;
  }

  clearObserver(scene) {
    const sceneId = scene._uid;
    if (sceneId in this.observersBySceneId) {
      delete this.observersBySceneId[sceneId];
    }
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
        if (data.event in actionMap) {
          actionMap[data.event](annotation);
          Object.keys(this.observersBySceneId).forEach(k =>
            this.observersBySceneId[k].forEach(f => f(this))
          );
        }
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
