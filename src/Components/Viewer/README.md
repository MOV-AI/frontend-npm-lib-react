# README

## Notes on how the viewer is built

### Views

Classes that render a BaseViewer

### BaseViewer

The base component responsible for setting up the Babylon.js and the canvas.

### MainView

Is the entry point of the scene editor application and contains the following components:

- Tree of objects [left menu]
- Assets list component (maps, robots, meshes) [left menu]
- BaseViewer
- Object properties component [right menu]

#### Flow of the MainView

1. Create a basic scene: Creates Scene, Add grid, lighting,
2. Get Assets(names) from server: Maps, Robots, Meshes
3. Retrieve object tree from the server
4. Render objects in canvas, while lazy loading maps, and meshes

### Tree of objects

Contains the hierarchy of objects in a scene, each node of the tree has the following structure:

```javascript
TreeNode: {
    title: string,
    item: NodeItem,
    children: Array<TreeNode>,
    dispose: (x: TreeNode) => {}
}
```

The dispose function is derived by the item.dispose function.

### NodeItem

NodeItem is a class that contains:

- name: string
- mesh: Mesh
- dispose: () => ()

Every item in the node should extend NodeItem.

NodeItem types:

- Paths
- Key points
- BoxRegion
- Polygons
- Graph
- Map
- Meshes
- Robots
- Walls

_Node Item meshes have nodeItem property, a pointer to its nodeItem_
_Node Item meshes have getMouseContextActions function: () => {title:string, onClick: () => {}}_
_Some Node Item meshes have onClick function: () => {}_

#### Graph

An abstract graph is a tuple (V, E), where V is an arbitrary set, called the set of vertices and E is a subset of V^2 (a subset of pairs of vertices) and is called the set of edges.

- The Graph NodeItem, is a graph, where V is a subset of NodeItems. When importing a scene, the graph should be the last thing to be imported, since it depends on the meshes.
- This graph's physical realization, is composed of line/edges meshes that connect nodeItems centers of masses.
- The graph item constructs an invisible mesh on the scene under GlobalRef, all graph meshes are under this one.

If someone draws a path with drawPathTool it will generate an invisible edge between the first and last point of the path.

### Actions

Actions are a set of classes that implement the following interface:

```javascript
Action: {
  memory: Dictionary<String, Object>
  action: View => (),
}
```

#### Mouse Actions

```javascript
MouseKeyAction(Action): {
  onPointerDown: (MouseEvent, View) => (),
  onPointerMove: (MouseEvent, View) => (),
  onPointerUp: (MouseEvent,View) => ()
  onKeyUp: (KeyEvent,View) => ()
}
```

They are usually inside the mainView.jsx and take control of the mouse.

List of implemented Actions:

#### Normal actions

- Draw Path action
- Draw Polygon action
- Draw Graph action
- Draw Point action
- Draw BoxRegion action
- Drag Object action
- MultiSelect tool action
- Orbit scene action
- Draw wall action

#### Get asset action

- Add Robot action
- Add Map action
- Add Mesh action

### Map Action

Insert a map retrieved from Server/Redis and inserts it into the Babylonjs scene.

### Map

- Image file (png, jpeg,...)
- config file (YAML)

### Mesh

- Mesh file (STL, obj,...)

## Undo Manager

Every action in the scene editor should be an UndoAble action (E.g draw an edge, create box region, drag object,...).

The _MainView_ component has all the context of a scene, therefore it should also have the UndoManager object.
Every action in the scene editor should use this _MainView.UndoManager_, so that every _Ctr-z_ would work in any context within the scene.

## Server

All data is saved in Redis. Redis has 2 main namespaces regarding the viewer3d:

- GraphicsScene
- Package.maps
- Package.meshes

### GraphicScene

The GraphicScene namespace has the structure:

GraphicScene: Name -> AssetType: Name -> AssetName: AssetName -> Value: Any

The GraphicScene will store particular instances of GraphicAssets, Core/Basic Object, Tree of Objects and Set of assets and robots available to the scene:

Example of a scene:

- Default: GraphicScene

  - KeyPoint: AssetType
    - KeyPoint1: AssetName
      - Position: [0,0,0]
      - Quaternion: [0,0,0]
    - ...
    - KeyPointN: AssetName
      - ...
  - Robot: AssetType
    - RobotA: AssetName
      - Position: [1,0,0]
      - ..
  - Curve: AssetType

    - Curve1: AssetName
      - {
        list of points,
        average point,
        ...
        }

  - Memory: AssetType
    - Tree: AssetName
      - {
        json used by the viewer, describing the hierarchy of object in the scene.
        The data is duplicated, by choice, but this can be changed in the future.
        }

Is there Synchronization issues with replication?

No, I don't think so. Because all data is generated from only one source of truth, Memory.Tree.
That is, all data in Redis is a pure function of Memory.Tree and people should only change that through the backend.viewer callback

## Client-Server interaction

As the client is adding, deleting, and updating objects in a scene, the client will ask the server to update Redis DB (in the GraphicScene->Memory->Tree and the specific object types.)

### Collaborative setting

The client sends action( e.g add BoxRegion, Change Position of a key point, etc..) to the server, then transmits this action to the other clients in the same scene.

### Referentials

- World Referential: BabylonJs Referential
- Global Referential: Global Referential
- Mesh Referential: Local Referential

# Lazy Migrations

- Pose migration in BE
