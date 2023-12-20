{
  currentSelect == "Workouts" && (
    // blurview initiated until progress made!

    <View
      style={{
        display: "flex",
        flexDirection: "column",
        width: "87%",
        marginTop: 10,
        justifyContent: "space-evenly",
        height: "100%",
      }}
    >
      <BlurView style={{ flex: 1 }} intensity={10} />
      <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Text style={{ fontWeight: "bold", color: "white" }}>By Type</Text>
        <ScrollView
          style={{
            flex: 1,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View style={home(width, height).workoutTypeWrap}>
            {sectionTypes.map((el) => {
              return (
                <View style={home(null, null).workoutTypeContainer} key={el.id}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {el.name}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      {/*end of list one*/}
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", color: "white" }}>By Duration</Text>
        <ScrollView
          style={{
            flex: 1,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View style={home(width, height).workoutTypeWrap}>
            {durationTypes.map((el) => {
              return (
                <View
                  style={home(width, height).workoutTypeContainer}
                  key={el.id}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {el.name}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      {/**end of list two */}
      <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Text style={{ fontWeight: "bold", color: "white" }}>By Body Part</Text>
        <ScrollView
          style={{
            flex: 1,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
        >
          <View style={home(width, height).workoutTypeWrap}>
            {bodyPartTypes.map((el) => {
              return (
                <View style={home(null, null).workoutTypeContainer} key={el.id}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {el.name}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
