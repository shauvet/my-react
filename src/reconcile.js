/*
 * @Date: 2019-11-16 23:01:18
 * @LastEditors: guangling
 * @LastEditTime: 2019-11-16 23:02:24
 */

// dom diff
function render(element, container) {

  const prevInstance = rootInstance; // 1-虚拟dom主树干- == null
  const nextInstance = reconcile(container, prevInstance, element); 
  rootInstance = nextInstance; // 2-支树干- 领头啦
}

function reconcile(parentDom, instance, element) {
  if (instance == null) {
    // Create instance
    const newInstance = instantiate(element);
    parentDom.appendChild(newInstance.dom);
    return newInstance;
  } else if (element == null) { // <---- 1
    // Remove instance
    parentDom.removeChild(instance.dom);
    return null;
  } else if (instance.element.type === element.type) {
    // Update instance
    updateDomProperties(instance.dom, instance.element.props, element.props);
    instance.childInstances = reconcileChildren(instance, element);
    instance.element = element;
    return instance;
  } else {
    // Replace instance
    const newInstance = instantiate(element);
    parentDom.replaceChild(newInstance.dom, instance.dom);
    return newInstance;
  }
}