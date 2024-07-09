import feedSlice, { connected, connecting, disconnect, error, fetchOrdersFeed, initialState } from "./feed";


describe("tests for Feed Slice", () => {


    it("initialize with initialValue", () => {
        const feedSliceInit = feedSlice.reducer(initialState, { type: "unknown" });
        expect(feedSliceInit).toBe(initialState);
    });

    it("set connecting", () => {
        const action = {
            type: connecting.type,
        }
        const state = feedSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, isConnecting: true});
    });

    it ("set connected", () => {
        const action = {
            type: connected.type,
        }
        const state = feedSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, isConnecting: false, isConnected: true, isEstablishingConnection: true});
    })

    it ("set disconnect", () => {
        const action = {
            type: disconnect.type,
        }
        const state = feedSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, isConnecting: false, isConnected: false, isEstablishingConnection: false});
    })

    it("fetch orders feed", () => {
        const testData = {
            "success": true,
            "orders": [
              {
                "ingredients": [
                  "60d3463f7034a000269f45e7",
                  "60d3463f7034a000269f45e9",
                  "60d3463f7034a000269f45e8",
                  "60d3463f7034a000269f45ea"
                ],
                "_id": "",
                "status": "done",
                "number": 0,
                "createdAt": "2021-06-23T14:43:22.587Z",
                "updatedAt": "2021-06-23T14:43:22.603Z"
              }
            ],
            "total": 1,
            "totalToday": 1
        } 
        const action = {
            type: fetchOrdersFeed.type,
            payload: testData
        }
        const state = feedSlice.reducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            ...testData
        });
    });

    it("set error", () => {
        const action = {
            type: error.type,
            payload: 'test error message'
        }
        const state = feedSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, connectionError: 'test error message'});
    });

});